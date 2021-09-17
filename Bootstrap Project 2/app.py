from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def website():  # put application's code here
    return render_template('website.html')


@app.route('/skills/')
def skills():  # put application's code here
    return render_template('skills.html')


@app.route('/projects/')
def projects():  # put application's code here
    return render_template('projects.html')


@app.route('/education')
def education():  # put application's code here
    return render_template('education.html')


if __name__ == '__main__':
    app.run()
