import sys

def host_js(stringz):
    file1 = open('host', 'w')
    file1.write(stringz)
    file1.close()
    return

try:
    mode = sys.argv[1]
    if mode == 'dev':
        from __init__ import create_app
        app = create_app()
        app.run(host='127.0.0.1', debug=True)
    elif mode == 'rel':
        from __init__ import create_app
        app = create_app()
        app.run(host='0.0.0.0') #change IP for your PC
    else:
        print("To use this command you have to put in the terminal this command 'python3 run.py dev' for developent mode and/or 'python run.py rel'")
except IndexError:
        print("To use this command you have to put in the terminal this command 'python3 run.py dev' for developent mode and/or 'python run.py rel'")
