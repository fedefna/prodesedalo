import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdeService, Prode, PartidoData, Pregunta, PartidoPrediccion } from '../../services/prode.service';



@Component({
  selector: 'app-prode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prode.component.html',
  styleUrl: './prode.component.css'
})
export class ProdeComponent implements OnInit{
  prode!: Prode | null;
  partidos!: PartidoData[]| null;
  preguntas!: Pregunta[]| null

  constructor(private prodeService: ProdeService) { }

  ngOnInit(): void {
    // Obtener la lista de prodes del jugador actual
    this.prode = this.prodeService.getProdeSeleccionado();
    console.log('prode:', this.prode);

    // Obtener la lista de partidos de la Copa América, info imagenes, fecha 
    this.prodeService.getData().subscribe(data => {
      this.partidos = data[0].partidos;
      this.preguntas = data[0].preguntas;
      
      console.log('Partidos:', this.partidos);
      console.log('Preguntas:', this.preguntas);
    });
  }

  getResultadoLocalByPartiodoId(id: string): string {
    if (!this.prode || !this.prode.partidos) return '';
    const partido = this.prode.partidos.find(p => p.partidoId === id);
    return partido ? partido.resultadoLocal : '';
  }

  // getResultadoLocalByPartiodoId(id:string) {
  //   this.prode!.partidos.forEach(part => {
  //     console.log('part:', part);
  //     console.log('partId:', part.partidoId);
  //     console.log('id:', id);
  //     if (part.partidoId===id) {
  //       console.log('part.resultadoLocal:', part.resultadoLocal);
  //       return part.resultadoLocal;
  //     }else return "";
  //   });
  // }

  getResultadoVisitanteByPartiodoId(id: string): string{
    if (!this.prode || !this.prode.partidos) return '';
    const partido = this.prode.partidos.find(p => p.partidoId === id);
    return partido ? partido.resultadoVisitante : '';
  }

  getRespuestaByPreguntaId(id:string): string {
    if (!this.prode || !this.prode.preguntas) return '';
    const pregunta = this.prode.preguntas.find(p => p.preguntaId === id);
    return pregunta ? pregunta.respuesta : '';
  }
}
