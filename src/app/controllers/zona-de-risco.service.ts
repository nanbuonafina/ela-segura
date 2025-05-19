import { Injectable } from '@angular/core';
import { ZonaDeRisco } from '../models/zona-de-risco.model';

@Injectable({
  providedIn: 'root'
})
export class ZonaDeRiscoService {

  private zonasDeRisco: ZonaDeRisco[] = [];

  constructor() {
    this.zonasDeRisco.push(
      { id: 1, latitude: -8.05, longitude: -34.88, raio: 300, nivelRisco: 'alto', ocorrenciasRelacionadas: [1, 2, 3] },
      { id: 2, latitude: -8.06, longitude: -34.89, raio: 200, nivelRisco: 'medio', ocorrenciasRelacionadas: [4] }
    );
  }

  adicionarZona(zona: ZonaDeRisco): void {
    this.zonasDeRisco.push(zona);
  }

  listarZonas(): ZonaDeRisco[] {
    return this.zonasDeRisco;
  }

  buscarPorId(id: number): ZonaDeRisco | undefined {
    return this.zonasDeRisco.find(z => z.id === id);
  }

  removerZona(id: number): void {
    this.zonasDeRisco = this.zonasDeRisco.filter(z => z.id !== id);
  }

  // Método extra: buscar zonas próximas de uma coordenada
  buscarZonasProximas(lat: number, lng: number, distanciaMaxima: number): ZonaDeRisco[] {
    return this.zonasDeRisco.filter(zona => {
      const distancia = this.calcularDistancia(lat, lng, zona.latitude, zona.longitude);
      return distancia <= distanciaMaxima;
    });
  }

  // Cálculo de distância entre dois pontos geográficos (em metros)
  private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000; // Raio da Terra em metros
    const dLat = this.grausParaRadianos(lat2 - lat1);
    const dLon = this.grausParaRadianos(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.grausParaRadianos(lat1)) * Math.cos(this.grausParaRadianos(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private grausParaRadianos(graus: number): number {
    return graus * (Math.PI / 180);
  }
}
