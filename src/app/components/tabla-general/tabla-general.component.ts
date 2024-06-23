import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Puntajes } from '../../interfaces/puntajes.interface';
import { PuntajesService } from '../../services/puntajes.service';
import { ProdeService } from '../../services/prode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-general.component.html',
  styleUrl: './tabla-general.component.css'
})
export class TablaGeneralComponent {
  puntajes: Puntajes[] = [];
  navegador = inject(Router);
  constructor(public puntajeService: PuntajesService,public prodeService: ProdeService) {}

  ngOnInit(): void {
    this.puntajeService.traerResultados().subscribe(puntajes => {
      this.puntajes = puntajes;
    });
  }

  async seleccionarProde(puntaje: Puntajes) {
    this.prodeService.seleccionarProde(puntaje.jugadorId!.toString()).subscribe(() => {
      this.navegador.navigate(['/prode']);
    });
  }

}
