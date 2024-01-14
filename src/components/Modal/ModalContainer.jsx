import React from 'react';
import { UpdateModal } from './components';
import Modal from './Modal';

const ModalContainer = ({ customerId, isOpen }) => {


    return (
        <div>
            <Modal
                isOpen={isOpen}
                size={700}
                toggle={() => { }}
                customClass="update-modal">
                <UpdateModal customerId={customerId} />
            </Modal>

        </div>
    );
}

export default ModalContainer;
