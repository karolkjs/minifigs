export interface RebrickableMiniFig {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
}

export interface RebrickableMiniFigPart {
  id: number;
  inv_part_id: number;
  part: {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string;
    external_ids: {
      BrickOwl: string[];
      BrickLink: string[];
      Lego: string[];
    };
    color: {
      id: number;
      name: string;
      rgb: string;
      is_trans: boolean;
      external_ids: {
        BrickLink: number[];
        Lego: number[];
      };
    };
    set_num: string;
    quantity: number;
    is_spare: boolean;
    element_id: string;
    num_sets: number;
  };
}

export interface MiniFig extends RebrickableMiniFig {
  parts?: RebrickableMiniFigPart[];
}

export interface RebrickableMiniFigResponse {
  config: any;
  data: {
    count: number;
    next: string;
    previous: string | null;
    results: RebrickableMiniFig[];
  };
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export interface RootState {
  cart: MiniFig;
  localization: string;
}

export interface ShippingFormValues {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface Order {
  id: number;
  shipping_details: ShippingFormValues;
  fig_id: number;
}