import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CircuitService, Circuit } from '../../services/circuit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-circuit',
  templateUrl: './add-circuit.component.html',
  styleUrls: ['./add-circuit.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AddCircuitComponent {
  circuit: Circuit = {
    name: '',
    description: '',
    location: '',
    rating: 0.0,
    difficulty_level: 1,
  };

  constructor(public circuitService: CircuitService, public router: Router) {}

  addCircuit(): void {
    this.circuitService.createCircuit(this.circuit).subscribe(
      () => {
        console.log('Circuit added successfully!');
        this.router.navigate(['/circuits']); // Navigate to the list after adding
      },
      (error) => {
        console.error('Error adding circuit:', error);
      }
    );
  }
}
