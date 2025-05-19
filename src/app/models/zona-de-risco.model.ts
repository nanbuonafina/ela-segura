export interface ZonaDeRisco {
  id: number;
  latitude: number;
  longitude: number;
  raio: number; // em metros
  nivelRisco: 'baixo' | 'medio' | 'alto';
  ocorrenciasRelacionadas: number[]; // IDs das ocorrências associadas
}