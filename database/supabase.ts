export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      feedback: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_anonymous: boolean;
          owner_id: string;
          status: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_anonymous?: boolean;
          owner_id?: string;
          status: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_anonymous?: boolean;
          owner_id?: string;
          status?: string;
        };
        Relationships: [];
      };
      feedback_reactions: {
        Row: {
          comment: string | null;
          created_at: string;
          feedback_id: string;
          id: number;
          owner_id: string;
          reaction_type: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string;
          feedback_id: string;
          id?: number;
          owner_id?: string;
          reaction_type: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string;
          feedback_id?: string;
          id?: number;
          owner_id?: string;
          reaction_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_reactions_feedback_id_fkey';
            columns: ['feedback_id'];
            isOneToOne: false;
            referencedRelation: 'feedback';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          avatar?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          avatar?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
