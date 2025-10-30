import { Resident } from "./resident";

export type DeliveryStatus = 'PARA_RETIRADA' | 'ENTREGUE' | 'DESCARTADA';

export interface Delivery {
  id: string;
  residentId: string;
  condominiumId?: string;
  description?: string;
  status: DeliveryStatus;
  createdAt?: string;
  updatedAt?: string;
  resident?: Resident;
}