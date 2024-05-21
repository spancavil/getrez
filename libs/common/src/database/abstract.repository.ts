//Common CRUD functionalities. All other repos will extend this abstract class.
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(documentToSave: Omit<TDocument, '_id'>): Promise<TDocument> {
    //Created document will have all properties of documentToSave plus _id
    const createdDocument = new this.model({
      ...documentToSave,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  //Find one document filtered with properties that only exist on TDocument
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const foundDocument = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    if (!foundDocument) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return foundDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const foundAndUpdatedDocument = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true })
      .lean<TDocument>(true);
    if (!foundAndUpdatedDocument) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return foundAndUpdatedDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return await this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
