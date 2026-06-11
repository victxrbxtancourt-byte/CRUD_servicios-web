import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// NUEVO: Interfaz para tipar las ciudades que vienen de SQL Server
export interface Ciudad {
  id: number;
  nombre: string;
}

export interface Cliente {
  id: number;
  nombre: string;
  correo?: string;
  telefono?: string;
  ciudadId?: number | null;      // NUEVO: Almacena el ID de la ciudad elegida
  ciudadNombre?: string | null;  // NUEVO: Almacena el texto de la ciudad ("Bogotá", etc.)
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly apiUrl = 'http://localhost:3000/api/clientes';
  private readonly http = inject(HttpClient);

  list() {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  // NUEVO: Obtiene la lista de ciudades para llenar tu componente <select>
  listCiudades() {
    return this.http.get<Ciudad[]>(`${this.apiUrl}/ciudades`);
  }

  create(cliente: Partial<Cliente>) {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  update(id: number, cliente: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
