import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Data {
  partidos: PartidoData[];
  preguntas: Pregunta[];
}

export interface PartidoData {
  id: string;
  fecha:string;
  fotoLocal: string;
  fotoVisitante: string;
  local: string;
  visitante: string;
}

export interface Pregunta {
  id: string;
  pregunta: string;
}

export interface Prode {
  jugadorId: string;
  jugador: string;
  partidos: PartidoPrediccion[];
  preguntas: RespuestaPrediccion[];
}

export interface PartidoPrediccion {
  partidoId: string;
  resultadoLocal:string;
  resultadoVisitante:string;
}

export interface RespuestaPrediccion {
  preguntaId: string;
  respuesta:string;
}

@Injectable({
  providedIn: 'root'
})

export class ProdeService {
  private prodeSeleccionado: Prode | null = null;

  constructor(private firestore: AngularFirestore) {  }

  getProdesByJugadorId(jugadorId: string): Observable<Prode[]> {
    return this.firestore.collection<Prode>('Prodes', ref => ref.where('jugadorId', '==', jugadorId))
      .valueChanges();
  }

  getPartidos(): Observable<PartidoData[]> {
    return this.firestore.collection('Data').doc('partidos').valueChanges()
      .pipe(
        map((data: any) => data ? data.partidos : [])
      );
  }

  getPreguntas(): Observable<Pregunta[]> {
    return this.firestore.collection('Data').doc('preguntas').valueChanges()
      .pipe(
        map((data: any) => data ? data.preguntas : [])
      );
  }

  getData(){
    return this.firestore.collection<Data>('Data', ref => ref)
      .valueChanges();
  }
  // getData(): Observable<Data> {
  //   return this.firestore.collection('Data').doc('data').valueChanges()
  //     .pipe(
  //       map((data: any) => {
  //         console.log('Data:', data);
  //         return data ? data as Data : { partidos: [], preguntas: [] };
  //       })
  //     );
  // }


  seleccionarProde(jugadorId: string): Observable<void> {
    return this.getProdesByJugadorId(jugadorId).pipe(
      map(prodes => {
        this.prodeSeleccionado = prodes.length > 0 ? prodes[0] : null;
      })
    );
  }

  getProdeSeleccionado(): Prode | null {
    return this.prodeSeleccionado;
  }
}
