import psycopg2

def create_db():
#establishing the connection
    conn = psycopg2.connect(
    database="postgres", user='postgres', password='password', host='127.0.0.1', port= '5432'
    )
    conn.autocommit = True

    #Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    #Creating a database
    cursor.execute('CREATE database isindebele')
    print("Database created successfully........")

    #Closing the connection
    conn.close()

def create_user_table():
    return