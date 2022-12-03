import { Observable, Subscriber, Subscription }  from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy{

  helloSub        : Subscription;
  nombrePaireSub  : Subscription;
  TimerSub  : Subscription;
  secondes : number;
  constructor() { }

  ngOnInit(): void {

     //variable de souscription


    //Observable Hello World
  //   const helloObserv = new Observable( (observer) => {
  //     observer.next("hello ");
  //     observer.next(" world !");
  //     observer.complete();
  //   });
  //    //Abonnement
  //  this.helloSub =  helloObserv.subscribe(
  //     (value) => {
  //       console.log("Value :"+value);
  //     },
  //     (error) =>{
  //       console.log("error :"+ error);

  //     },
  //     () => {
  //       console.log("Observable terminée !");

  //     }
  //     );

      //Observable nombre paire
    //   const nombrePaire = new Observable((observer) =>
    //     {
    //       let value = 0;
    //       const interval = setInterval(()=> {
    //         if (value % 2 === 0) {
    //           observer.next(value);
    //         }
    //         value ++ ;
    //       }, 1000 );
    //       return () => clearInterval(interval);
    //     }
    //   );
    //   //Abonnement
    // this.nombrePaireSub =   nombrePaire.subscribe(
    //     (value) => {
    //       console.log("nombre paire :"+ value);

    //     }
    //   );

       //Observable timer
       const timer = new Observable((observer) =>
       {
         let value = 0;
         const interval = setInterval(()=> {
             observer.next(value);
           value ++ ;
         }, 1000 );
         return () => clearInterval(interval);
       }
     );
     //Abonnement
  //  this.TimerSub =   timer.subscribe(
  //      (value) => {
  //        console.log("timer :"+ value);
  //        this.secondes = +value;

  //      }
  //    );




  }

  ngOnDestroy() {
    //this.helloSub.unsubscribe();
    //this.nombrePaireSub.unsubscribe();
   // this.TimerSub .unsubscribe();
  }


}
