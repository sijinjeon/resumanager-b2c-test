export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      test_results: {
        Row: {
          id: string
          user_id: string
          answers: Json
          final_why: string
          final_how: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          answers: Json
          final_why: string
          final_how: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          answers?: Json
          final_why?: string
          final_how?: string
          created_at?: string
        }
      }
    }
  }
}

