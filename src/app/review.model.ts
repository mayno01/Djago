export interface Review {
    id: number;
    user: number;  // You might want to define a User interface too
    circuit: number; // ID of the Circuit
    rating: number;
    comment?: string;  // Optional field
  }
  