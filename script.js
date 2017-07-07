class Stopwatch extends React.Component {//class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {//Metoda, która zeruje stoper.Zawiera minuty, sekundy i milisekundy.
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
    	};
    }		

    print() {//Metoda ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display. Dzieje się to przy użyciu metody format.
        this.display.innerText = this.format(this.times);
	}

	format(times) {//Metoda przygotowuje tekst do wyświetlenia.Zwraca szablon, który wykorzystuje obiekt times.
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {//Uruchomienie stopera.
	    if (!this.running) {//Sprawdzenie czy timer już nie chodzi- flaga running.
	        this.running = true; //Jeśli stoper był zatrzymany należy go uruchomić ustawiając flagę running na true.
	        this.watch = setInterval(() => this.step(), 100).bind;//Interwał odpala co 10 ms metodę step ,która jest kolejnym tikiem stopera.
    	}
	}

	step() {//Metoda sprawdza, czy stoper jest uruchomiony. Jeśli tak, należy metodą calculate przeliczyć odpowiednio minuty, sekundy i milisekundy, a następnie wydrukować wynik za pomocą metody print.
	    if (!this.running) return;
	    this.calculate();
	    this.print();
	}

	calculate() {//Metoda ta zeruje wartości milisekund i sekund, jeśli te przekroczą pewną wartość i odpowiednio zwiększa sekundy i minuty.
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}

	stop() {//Metoda zatrzymuje stoper ustawiając flagę running na false, a następnie czyści interwał, który kryje się pod atrybutem watch.
	    this.running = false;
	    clearInterval(this.watch);
	}

	render() {
		const runningStopwatch = this.running ? 'running' : '';
			return (
				<div className='container'>
					<nav className='buttons'>
						<startButton onclick={this.start} />
						<stopButton onclick={this.stop}/>
					</nav>
					<div className={'stopwatch ' + runningStopwatch}>
						{this.format(this.times)}
					</div>
				</div>
			);		
	}

}

function pad0(value) {//Funkcja pad0 ma za zadanie dodać zero do liczb jednocyfrowych. 
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));

/*const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

var startButton = document.getElementById('start');
startButton.addEventListener('click',()=> stopwatch.start());
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click',()=> stopwatch.stop);
stopButton.addEventListener('click', () => stopwatch.stop());
*/