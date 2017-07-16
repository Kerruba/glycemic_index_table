let store = {
    debug: true,
    state: {
        aliments: []
    },
    setAlimentsAction (newValue) {
        if (this.debug) console.log('setAlimentsAction triggered with', newValue);
        this.state.aliments = newValue;
    },
    clearAlimentsAction () {
        if (this.debug) console.log('clearAlimentsAction triggered');
        this.state.aliments = [];
    }
};

export default store;