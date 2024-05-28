export class CounterService {
    activeToInactiveCounter = 0
    inactiveToActiveCounter = 0

    incrementActiveToInactive(){
        this.activeToInactiveCounter++
        console.log('Active to Inative : ',this.activeToInactiveCounter)
    }
    incrementInactiveToActive(){
        this.inactiveToActiveCounter++
        console.log('Inactive to Active : ',this.inactiveToActiveCounter)
    }

}