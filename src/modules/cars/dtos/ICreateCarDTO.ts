interface ICreateCarDTO {

  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  is_available?: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string
  category_id: string;

}

export { ICreateCarDTO };