import Modal from '../actions/modal';

const initialState = {
    refetch: 0,
    isOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case Modal.SUCCESS: {
            return {
                ...state,
                refetch: state.refetch + 1
            };
        }
        case 'open': {
            return {
                ...state,
                isOpen: !state.isOpen
            }
        }

        default:
            return state;
    }
};
