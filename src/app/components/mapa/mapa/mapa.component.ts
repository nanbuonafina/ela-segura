import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ZonaDeRiscoService } from 'src/app/controllers/zona-de-risco.service';
import { ZonaDeRisco } from 'src/app/models/zona-de-risco.model';
import { Geolocation } from '@capacitor/geolocation'; // 👈 Importando geolocalização

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements AfterViewInit {

  private mapa: L.Map | undefined;

  constructor(private zonaDeRiscoService: ZonaDeRiscoService) {}

  ngAfterViewInit(): void {
    this.inicializarMapa();
    setTimeout(() => {
      this.mapa?.invalidateSize();
    }, 0);
  }

  async inicializarMapa(): Promise<void> {
    this.mapa = L.map('mapa').setView([-8.05428, -34.8813], 13); // Ex: Recife

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.mapa);

    this.carregarZonasDeRisco();

    // 👇 Captura localização atual e adiciona ao mapa
    await this.marcarLocalizacaoAtual();
  }

  carregarZonasDeRisco(): void {
    const zonas = this.zonaDeRiscoService.listarZonas();
    zonas.forEach(zona => {
      const circle = L.circle([zona.latitude, zona.longitude], {
        color: this.definirCorPorNivel(zona.nivelRisco),
        fillColor: this.definirCorPorNivel(zona.nivelRisco),
        fillOpacity: 0.4,
        radius: zona.raio
      }).addTo(this.mapa!);

      circle.bindPopup(`
        <strong>Zona de Risco:</strong> ${zona.nivelRisco.toUpperCase()}<br>
        Ocorrências: ${zona.ocorrenciasRelacionadas.length}
      `);
    });
  }

  definirCorPorNivel(nivel: string): string {
    switch (nivel) {
      case 'alto': return 'red';
      case 'medio': return 'orange';
      case 'baixo': return 'yellow';
      default: return 'gray';
    }
  }

  // 👇 Função para capturar e mostrar a localização do usuário
  async marcarLocalizacaoAtual(): Promise<void> {
    try {
      const position = await Geolocation.getCurrentPosition();

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const marcador = L.marker([latitude, longitude]).addTo(this.mapa!);
      marcador.bindPopup('Você está aqui!').openPopup();

      // Ajusta o centro do mapa para a localização atual
      this.mapa?.setView([latitude, longitude], 15);

    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  }

}
