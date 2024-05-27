import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  //Expect a JWT cookie before access a route

  //At inject we specify the token. The object authClient will allow to communicate with another microservices
  constructor (@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      //When false it cannot proceed to the request
      return false;
    }
    //We will send a message to authenticate message throught our ClientProxy
    return this.authClient.send<User>('authenticate', {
        Authentication: jwt
    }).pipe(
        //run a side effect to the incoming response
        tap(res => {            
            //Set the user property in the request with the response
            context.switchToHttp().getRequest().user = res 
        }),
        map(()=> true) //Return true allows to proceed
    )
  }
}
