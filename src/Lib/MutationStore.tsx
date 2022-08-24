import React, { useEffect, useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'

const always = (x: boolean) => !x

function MutationStore<State>(initial: State) {
    let state = cloneDeep(initial)
    let queued = false
    const listeners = new Set<() => void>()
    
    function subscribe(listener: () => void) {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
    }

    /** hook to listen to the state changes 
     * @param comparator function to convert the state to a comparable value, used to check for specific changes
     * @returns the current state
    */
    function useObserver(comparator?: (state: State) => any): State {
        const [_, forceUpdate] = useState(false)

        useEffect(() => {
            let oldEncoding = comparator ? comparator(state) : undefined

            return subscribe(() => {
                if(comparator) {
                    const newEncoding = comparator(state)
                    if(newEncoding === oldEncoding) return
                    oldEncoding = newEncoding
                } 
                
                forceUpdate(always)
            })
        }, [comparator])

        return state
	}

    /** queue all updates, once per render cycle.
     * update observers when the event loop is free
    */
    function notify() {
        if(!queued) {
            queued = true
            setTimeout(() => { 
                listeners.forEach(f => f())
                queued = false
            }, 0)
        }
    }

    /** get the state externally */
    function getState() {
        return state
    }
    
    /** reset the store to the initial value */
    function reset() {
        state = cloneDeep(initial)
        notify()
    }

    return {
        getState,
        useObserver,
        notify,
        reset
    }
}

export default MutationStore
