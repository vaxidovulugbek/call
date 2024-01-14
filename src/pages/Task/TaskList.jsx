import React from "react";
// import { ReactComponent as AddIcon } from "assets/images/svg/add.svg";
// import AppTaskList from "./components/AppTaskList";
// import { TASKS } from "./components/json";
import AppTaskBar from "./components/AppTaskList";

const TaskList = () => {

	return (
		<section className="App-main">
			{/* <div className="application"> */}
				<AppTaskBar />
				{/* <AppTaskList  tasks={TASKS} /> */}
				{/* <BlackBoard />
				<BlackBoard />
				<BlackBoard />
				<BlackBoard /> */}
				{/* <button className="application__add-board">
					<AddIcon />
					Yangi doska yaratish
				</button> */}
			{/* </div> */}
		</section>
	);
};

export default TaskList;
