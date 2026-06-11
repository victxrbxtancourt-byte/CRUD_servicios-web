import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ClientesService, Cliente, Ciudad } from './clientes.service'; // MODIFICADO: Importamos Ciudad

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {
  protected clientes = signal<Cliente[]>([]);
  protected ciudades = signal<Ciudad[]>([]); // NUEVO: Almacena las ciudades traídas de la DB
  protected loading = signal(false);
  protected error = signal('');
  protected editId = signal<number | null>(null);
  
  protected nombre = signal('');
  protected correo = signal('');
  protected telefono = signal('');
  protected ciudadId = signal<number | null>(null); // NUEVO: Enlaza la selección del <select>

  private readonly service = inject(ClientesService);

  constructor() {
    this.load();
  }

  protected async load() {
    this.loading.set(true);
    this.error.set('');

    try {
      // MODIFICADO: Cargamos clientes y ciudades en paralelo para optimizar rendimiento
      const [clientesResponse, ciudadesResponse] = await Promise.all([
        lastValueFrom(this.service.list()),
        lastValueFrom(this.service.listCiudades())
      ]);

      this.clientes.set(clientesResponse);
      this.ciudades.set(ciudadesResponse); // NUEVO: Llenamos el listado del select
    } catch (error) {
      this.error.set('Error cargando los datos del servidor.');
    } finally {
      this.loading.set(false);
    }
  }

  protected resetForm() {
    this.editId.set(null);
    this.nombre.set('');
    this.correo.set('');
    this.telefono.set('');
    this.ciudadId.set(null); // NUEVO: Resetea el select a su estado inicial
  }

  protected edit(cliente: Cliente) {
    this.editId.set(cliente.id);
    this.nombre.set(cliente.nombre ?? '');
    this.correo.set(cliente.correo ?? '');
    this.telefono.set(cliente.telefono ?? '');
    this.ciudadId.set(cliente.ciudadId ?? null); // NUEVO: Carga la ciudad del cliente en el formulario
  }

  protected async save() {
    if (!this.nombre()) {
      this.error.set('El nombre es requerido.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      // MODIFICADO: Agregamos ciudadId al objeto que se enviará a Node.js
      const payload = {
        nombre: this.nombre(),
        correo: this.correo(),
        telefono: this.telefono(),
        ciudadId: this.ciudadId(), 
      };

      if (this.editId() !== null) {
        await lastValueFrom(this.service.update(this.editId()!, payload));
      } else {
        await lastValueFrom(this.service.create(payload));
      }

      this.resetForm();
      await this.load();
    } catch (error) {
      this.error.set('Error guardando cliente.');
    } finally {
      this.loading.set(false);
    }
  }

  protected async remove(id: number) {
    if (!confirm('¿Eliminar este cliente?')) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      await lastValueFrom(this.service.delete(id));
      await this.load();
    } catch (error) {
      this.error.set('Error eliminando cliente.');
    } finally {
      this.loading.set(false);
    }
  }
}
