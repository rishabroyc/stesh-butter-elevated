// Hand-maintained types for the tables this app reads and writes.
// Not a full Supabase-generated schema — just enough shape for the client to
// type-check `.from(...).select/insert/update(...)` calls correctly. Add a
// column here when the code starts using it.

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          phone: string | null;
          address_line1: string | null;
          address_line2: string | null;
          city: string | null;
          state: string | null;
          zip: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          phone?: string | null;
          address_line1?: string | null;
          address_line2?: string | null;
          city?: string | null;
          state?: string | null;
          zip?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          product_name: string;
          variant_id: string;
          variant_name: string | null;
          cadence_weeks: 2 | 4 | 8;
          status: "active" | "paused" | "cancelled" | "pending_payment";
          next_shipment_date: string | null;
          price_cents: number | null;
          discount_percent: number;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_name: string;
          variant_id: string;
          variant_name?: string | null;
          cadence_weeks: 2 | 4 | 8;
          status?: "active" | "paused" | "cancelled" | "pending_payment";
          next_shipment_date?: string | null;
          price_cents?: number | null;
          discount_percent?: number;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["subscriptions"]["Insert"]>;
        Relationships: [];
      };
      email_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_subscribers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
