import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
   console.log("http inyter");
    // We retrieve the token, if any
    const token = JSON.parse(localStorage.getItem('token'));
    let newHeaders = req.headers;
    if (token) {
       // If we have a token, we append it to our new headers
       newHeaders = newHeaders.append('authtoken', token);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({headers: newHeaders});
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
}
}
