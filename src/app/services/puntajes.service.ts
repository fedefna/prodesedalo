
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../clases/user';
import { Puntajes } from '../interfaces/puntajes.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {

  private puntajesRef: AngularFirestoreCollection<Puntajes>;
  public usuario: User = new User();

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.puntajesRef = this.afs.collection('Puntajes'); 
  }

  traerResultados(): Observable<Puntajes[]> {
    return this.afs.collection<Puntajes>('Puntajes', ref => ref.orderBy('puntos', 'desc').limit(10))
      .valueChanges();
  }

}
