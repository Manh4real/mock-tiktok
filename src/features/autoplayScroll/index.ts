export class AutoplayScroll {
    observers: AutoplayScrollObserver[] = [];

    subscribe(observer: AutoplayScrollObserver) {
        this.observers.push(observer);
    }

    unsubscribe(observer: AutoplayScrollObserver) {
        const observerIndex = this.observers.findIndex(ob => ob === observer);

        this.observers.splice(observerIndex, 1)
    }

    fire() {
        this.observers.forEach(observer => {
            observer.receive();
        });
    }
}

export interface AutoplayScrollObserverProps {
    elem: HTMLDivElement | null,
    action: () => void;
}

export class AutoplayScrollObserver {
    props: AutoplayScrollObserverProps;
    timeID: NodeJS.Timeout | number = -999;

    constructor(props: AutoplayScrollObserverProps) {
        this.props = props;
    }

    receive() {
        clearTimeout(this.timeID);

        this.timeID = setTimeout(() => {
            if (!this.props.elem) return;

            const { top, height } = this.props.elem.getBoundingClientRect();

            if (top <= height / 2 && top >= -height / 2) {
                this.props.action();
            }
        }, 600);
        // else {
        //     unsubscribe(this);
        // }

    }

}