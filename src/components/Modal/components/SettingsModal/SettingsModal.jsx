import React from "react";
// import EntityForm from "modules/entity/forms";
// import { toast } from "react-toastify";
import { Link  } from "react-router-dom";
import service from '../../../../assets/images/svg/service.svg'
import organizationNum from '../../../../assets/images/svg/organizationNum.svg'
import source from '../../../../assets/images/svg/source.svg'
import callHistory from '../../../../assets/images/svg/callHistory.svg'
import statistic from '../../../../assets/images/svg/statistic.svg'
import operators from '../../../../assets/images/svg/operators.svg'
import plugins from '../../../../assets/images/svg/plugins.svg'

const SettingsModal = ({ handleClose }) => {

	return (
		<div className="modal-wrapper">
			<div>
				<div className="settingsModall">
          <p className="settingsModall__text">Advanced Options</p>
          <nav>
            <ul className="settingsModall__list">
              <li className="settingsModall__item">
              <Link
                to="/operator-statistics"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={service} alt="" />
                <p>Операторы</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/analytice"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={organizationNum} alt="" />
                <p>Аналитика</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/profile"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={source} alt="" />
                <p>Профиль</p>
              </Link>
            </li>
            <li className="settingsModall__item">
              <Link
                to="/organization-number"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={callHistory} alt="" />
                <p>Номер</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/service"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={statistic} alt="" />
                <p>Услуги</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/source"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={operators} alt="" />
                <p>Источники</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/plugins"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={plugins} alt="" />
                <p>плагины</p>
              </Link>
            </li>

            <li className="settingsModall__item">
              <Link
                to="/application"
                className="settingsModall__link"
                onClick={() => {
                  handleClose && handleClose();
                }}>
                <img src={plugins} alt="" />
                <p>application</p>
              </Link>
            </li>
            </ul>
          </nav>

          <button
						type="reset"
						className="settingsModall__close"
						data-bs-dismiss="modal"
						onClick={() => {
							handleClose && handleClose();
							// toast.error("Действие отменено!")
						}}>
						x
					</button>
        </div>
			</div>
		</div>
	);
};


export default SettingsModal;
