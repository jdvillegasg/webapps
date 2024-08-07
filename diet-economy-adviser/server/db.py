import os
import psycopg2
from psycopg2 import pool, sql
from dotenv import load_dotenv

class HandleNutritionTable(object):
    def __init__(self):
        # Load .env file
        load_dotenv()

        # Get the connection string from the environment variable
        DATABASE_URL = os.getenv('DATABASE_URL')
        self.DATABASE_URL = DATABASE_URL
        self.status_code = {'success': 1, 'error': -1, 'data': None}

        self.common_queries = {'insert_data': """
INSERT INTO nutrition_table (title, carbs, fat, protein, calories, sodium, fiber, vitaA, vitaC, folic, calcium, iron, price, description, personalrating, potasium, magnesium, city, vitaB12, maxquantity)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
""", 'drop_table':"DROP TABLE IF EXISTS nutrition_table;", 'create_table': """
CREATE TABLE nutrition_table (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    carbs NUMERIC(12, 2) NOT NULL,
    fat NUMERIC(12, 2) NOT NULL,
    protein NUMERIC(12, 2) NOT NULL,
    calories NUMERIC(12, 2) NOT NULL,
    sodium NUMERIC(12, 2) NOT NULL,
    fiber NUMERIC(12, 2) NOT NULL,
    vitaA NUMERIC(12, 2) NOT NULL,
    vitaC NUMERIC(12, 2) NOT NULL,
    vitaB12 NUMERIC(12, 2) NOT NULL,
    folic NUMERIC(12, 2) NOT NULL,
    calcium NUMERIC(12, 2) NOT NULL,
    iron NUMERIC(12, 2) NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    description VARCHAR(100) NOT NULL,
    personalrating NUMERIC(3, 1) NOT NULL CHECK (personalrating >= 0 AND personalrating <= 1),
    potasium NUMERIC(12, 2) NOT NULL,
    magnesium NUMERIC(12, 2) NOT NULL,
    city city_enum NOT NULL DEFAULT 'Cali'
);
""", 'delete_data': """
DELETE FROM nutrition_table 
WHERE title = %s;
""", 'create_enum': lambda x:f"""
DO $$ BEGIN
    CREATE TYPE city_enum AS ENUM ({x});
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
"""
}
    
    def create_table(self):
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            # Execute the SQL statement
            cursor.execute(self.common_queries['create_table'])
            
            # Commit the changes
            conn.commit()
            
            print("Table created successfully")
            
        except Exception as error:
            print(f"Error: {error}")
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    def insert_data(self, data):
        '''
        Example:
        data = [("Apple", 14.0, 0.2, 0.3, 52.0, 1.0, 2.4, 54.0, 14.0, 3.0, 6.0, 0.1, 0.3),
            ("Banana", 23.0, 0.3, 1.3, 96.0, 1.0, 2.6, 64.0, 12.0, 2.0, 5.0, 0.2, 0.4)]
        '''
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            # Execute the insert statement for each row of data
            for row in data:
                cursor.execute(self.common_queries['insert_data'], row)
            
            # Commit the changes
            conn.commit()
            
            print("Data inserted successfully")
            msg = {'status_code': self.status_code['success'], 'data': None}
            
        except Exception as error:
            print(f"Error: {error}")
            msg = {'status_code': self.status_code['error'], 'data': error}
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()

            return msg

    def drop_table(self):
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            # Execute the drop table statement
            cursor.execute(self.common_queries['drop_table'])
            
            # Commit the changes
            conn.commit()
            
            print("Table deleted successfully")
            
        except Exception as error:
            print(f"Error: {error}")
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    def add_columns(self, add_columns_queries):
        '''
        Example:
        add_columns_queries = [
        "ALTER TABLE nutrition_table ADD COLUMN vitamin_d NUMERIC(12, 2);",
        "ALTER TABLE nutrition_table ADD COLUMN potassium NUMERIC(12, 2);",
        ]
        '''
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            # Execute each add column statement
            for query in add_columns_queries:
                cursor.execute(query)
            
            # Commit the changes
            conn.commit()
            
            print("Columns added successfully")
            
        except Exception as error:
            print(f"Error: {error}")
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    def delete_data(self, title_value):
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            cursor.execute(self.common_queries['delete_data'], (title_value,))
            
            # Commit the changes
            conn.commit()
            
            print("Data deleted successfully")
            
        except Exception as error:
            print(f"Error: {error}")
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    def create_enum(self, enum_values):
        '''
        Example:
        enum_values = [
            'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Soacha', 'Ibagué', 'Soledad',
            'Santa Marta', 'Villavicencio', 'Pereira', 'Manizales', 'Montería', 'Pasto', 'Neiva', 'Armenia', 'Popayán', 'Sincelejo'
        ]
        '''
        try:
            # Connect to the PostgreSQL database
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            
            enum_values = ", ".join(f"'{val}'" for val in enum_values)
            cursor.execute(self.common_queries['create_enum'](enum_values))
            
            # Commit the changes
            conn.commit()
            
            print("Enum type created successfully")
            
        except Exception as error:
            print(f"Error: {error}")
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    
    def get_foods(self):
        try:
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM nutrition_table")
            rows = cursor.fetchall()

            # Get column names
            colnames = [desc[0] for desc in cursor.description]

            # Convert to list of dictionaries
            foods = [dict(zip(colnames, row)) for row in rows]

            msg = {'status_code': self.status_code['success'], 'data': foods}
          
        except Exception as error:
            print(f"Error:{error}")
            msg = {'status_code': self.status_code['error'], 'data': error}
        finally:
            # Close the cursor and connection
            if cursor:
                cursor.close()
            if conn:
                conn.close()
            return msg

    def update_column_value(self, row_id, column_name, new_value):
        try:
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            query = sql.SQL("UPDATE nutrition_table SET {field} = %s WHERE id = %s").format(
                field=sql.Identifier(column_name)
            )
            cursor.execute(query, (new_value, row_id))
            conn.commit()
            print(f"Updated row with id {row_id} set {column_name} = {new_value}")
            msg = {'status_code': self.status_code['success'], 'data': "updated successfully"}
        except Exception as error:
            print(f"Error: {error}")
            msg = {'status_code': self.status_code['error'], 'data': error}
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
            return msg
    
    def get_food_by_id(self, row_id):
        try: 
            conn = psycopg2.connect(self.DATABASE_URL)
            cursor = conn.cursor()
            query = sql.SQL("SELECT * FROM nutrition_table WHERE id = %s")
            cursor.execute(query, (row_id,))
            row = cursor.fetchone()
            if row:
                column_names = [desc[0] for desc in cursor.description]
                msg = {'status_code': self.status_code['success'], 'data': dict(zip(column_names, row))}
            else:
                msg = {'status_code': self.status_code['error'], 'data': "No food found with given id"}
        except Exception as error:
            print(f"Error: {error}")
            msg = {'status_code': self.status_code['error'], 'data': error}
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
            return msg