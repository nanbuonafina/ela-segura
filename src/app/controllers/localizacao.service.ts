import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  constructor() { }

  obterLocalizacao(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });
          },
          (err) => reject(err)
        );
      } else {
        reject('Geolocalização não suportada.');
      }
    });
  }
}
