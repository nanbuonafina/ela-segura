import { Injectable } from '@angular/core';
import { Ocorrencia } from '../models/ocorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private ocorrencias: Ocorrencia[] = [];

  constructor() { }

  adicionarOcorrencia(ocorrencia: Ocorrencia): void {
    this.ocorrencias.push(ocorrencia);
  }

  listarOcorrencias(): Ocorrencia[] {
    return this.ocorrencias;
  }

  buscarPorId(id: number): Ocorrencia | undefined {
    return this.ocorrencias.find(o => o.id === id);
  }

  removerOcorrencia(id: number): void {
    this.ocorrencias = this.ocorrencias.filter(o => o.id !== id);
  }
}