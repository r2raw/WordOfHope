import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import dashboardbl from "../../my-images/images/dashboard-bl.png";
import dashboardbl from "../../my-images/images/dashboard-black-mats.png";
import dashboardwh from "../../my-images/images/dashboard-white-mats.png";
import accountsbl from "../../my-images/images/accounts-black.png";
import docschedbl from "../../my-images/images/docSched-black.png";
import patientdrbl from "../../my-images/images/demandRate-black.png";
// import dashboardwh from "../../my-images/images/dashboard-wh.png";
import accountswh from "../../my-images/images/accounts-white.png";
import docschedwh from "../../my-images/images/docSched-white.png";
import patientdrwh from "../../my-images/images/demandRate-white.png";

// HR Images
import attendancewh from "../../my-images/images/attendance-white.png";
import attendancebl from "../../my-images/images/attendance-black.png";

// Nurse image
import queuewh from "../../my-images/images/queue-white.png";
import queuebl from "../../my-images/images/queue-black.png";
import mylogwh from "../../my-images/images/mylog-white.png";
import mylogbl from "../../my-images/images/mylog-black.png";
import patientrecwh from "../../my-images/images/patientrecord-white.png";
import patientrecbl from "../../my-images/images/patientrecord-black.png";
import docwh from "../../my-images/images/doctorapmt-white.png";
import docbl from "../../my-images/images/doctorapmt-black.png";
import bookapmtwh from "../../my-images/images/bookapmt-white.png";
import bookapmtbl from "../../my-images/images/bookapmt-black.png";
import manageapmtwh from "../../my-images/images/manageapmt-white.png";
import manageapmtbl from "../../my-images/images/manageapmt-black.png";
import docSchedWh from "../../my-images/hopeImgs/doctor/doctorapmt-white.png";
import docSchedBl from "../../my-images/hopeImgs/doctor/doctorapmt-black.png";
import medihistwh from "../../my-images/hopeImgs/patient/medic-hist-white.png";
import medihistbl from "../../my-images/hopeImgs/patient/medic-hist-black.png";
import docLogWh from "../../my-images/hopeImgs/doctor/mylogdoc-white.png"
import docLogBl from "../../my-images/hopeImgs/doctor/mylogdoc-black.png"
import patientProfWh from "../../my-images/hopeImgs/patient/patientprof-white.png";
import patientProfBl from "../../my-images/hopeImgs/patient/patientprof-black.png";
import patientDemoBl from "../../my-images/hopeImgs/doctor/patientdemo-black.png"
import patientDemoWh from "../../my-images/hopeImgs/doctor/patientdemo-white.png"
import resultMgmtBl from "../../my-images/hopeImgs/doctor/resultmgmt-black.png"
import resultMgmtWh from "../../my-images/hopeImgs/doctor/resultmgmt-white.png"
import docapmtwh from "../../my-images/hopeImgs/doctor/docappointments-white.png"
import docapmtbl from "../../my-images/hopeImgs/doctor/docappointments-black.png"


import MNSAdmin from "./MNSAdmin";
import NavUserInfo from "./NavUserInfo";
import MnsUserInfo from "./MnsUserInfo";

function AdminNav(props) {
  const {user, backendData} = props;
  // const [backendData, setBackendData] = useState();
  // const backendData = props.backendData;
  // useEffect(() => {
  //   axios
  //     .get("/WordOfHope/MNS/" + user)
  //     .then((response) => {
  //       setBackendData(response.data);
  //     })
  //     .catch((error) => {});
  // }, []);

  // console.log(user)

  // console.log(backendData.user)
  const imageListMNS = [
    {
      id: 1,
      url: dashboardbl,
      wurl: dashboardwh,
      title: "Dashboard",
      path: `/WordOfHope/MNS/${user && user}/Dashboard`,
    },
    {
      id: 2,
      url: accountsbl,
      wurl: accountswh,
      title: "Accounts",
      path: `/WordOfHope/MNS/${user && user}/Accounts`,
    },
    {
      id: 3,
      url: accountsbl,
      wurl: accountswh,
      title: "Departments",
      path: `/WordOfHope/MNS/${user && user}/Departments`,
    },
    {
      id: 3,
      url: accountsbl,
      wurl: accountswh,
      title: "Services",
      path: `/WordOfHope/MNS/${user && user}/Services`,
    },
  ];



  return (
    <aside>
      <nav>
        <div className="nav-partition">
          {imageListMNS.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <MnsUserInfo
          // key={1}
          user={user}
          firstname={backendData && backendData.user[0].firstname}
          lastname={backendData && backendData.user[0].lastname}
          img={backendData && backendData.user[0].empimg}
          pos={backendData && backendData.user[0].position}
          backendData={backendData && backendData}
          openRfidDialog={props.openRfidDialog}
        />
      </nav>
    </aside>
  );
}



function HRNav(props) {
  const {user, backendData} = props;

  const imageListHr = [
    {
      id: 1,
      url: dashboardbl,
      wurl: dashboardwh,
      title: "Dashboard",
      path: `/WordOfHope/HR/${user}/Dashboard`,
    },
    {
      id: 2,
      url: manageapmtbl,
      wurl: manageapmtwh,
      title: "Schedules",
      path: `/WordOfHope/HR/${user}/Employee-Schedule`,
    },
    {
      id: 3,
      url: attendancebl,
      wurl: attendancewh,
      title: "Attendance",
      path: `/WordOfHope/HR/${user}/Attendance`,
    },
  ];
  return (
    <aside>
      <nav>
        <div className="nav-partition">
          {imageListHr.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <NavUserInfo
        
          key={1}
          user={user}
          firstname={backendData && backendData.user[0].firstname}
          lastname={backendData && backendData.user[0].lastname}
          img={backendData && backendData.user[0].empimg}
          pos={backendData && backendData.user[0].position}
          backendData={backendData && backendData}
        />
      </nav>
    </aside>
  );
}

function ReceptionistNav(props) {
  const {user, backendData} = props;
  const imageListRecept = [
    {
      basic: [
        {
          id: 1,
          url: dashboardbl,
          wurl: dashboardwh,
          title: "Dashboard",
          path: `/WordOfHope/Nurse/${user}/Dashboard`,
        },
        {
          id: 2,
          url: queuebl,
          wurl: queuewh,
          title: "Queues",
          path: `/WordOfHope/Nurse/${user}/Queue`,
        },
        {
          id: 3,
          url: mylogbl,
          wurl: mylogwh,
          title: "My Attendance Log",
          path: `/WordOfHope/Nurse/${user}/Log`,
        },
      ],
    },
    {
      patientMGMT: [
        {
          id: 1,
          url: accountsbl,
          wurl: accountswh,
          title: "Patient Accounts",
          path: `/WordOfHope/Nurse/${user}/Patient-Account`,
        },
        {
          id: 2,
          url: patientrecbl,
          wurl: patientrecwh,
          title: "Patient Records",
          path: `/WordOfHope/Nurse/${user}/Patient-Record`,
        },
      ],
    },
    {
      schedAPMT: [
        {
          id: 1,
          url: docbl,
          wurl: docwh,
          title: "Doctor Schedule",
          path: `/WordOfHope/Nurse/${user}/Doctor-Schedule`,
        },
        {
          id: 2,
          url: bookapmtbl,
          wurl: bookapmtwh,
          title: "Book Appointment",
          path: `/WordOfHope/Nurse/${user}/Book-Appointment`,
        },
        {
          id: 3,
          url: manageapmtbl,
          wurl: manageapmtwh,
          title: "Manage Appointments",
          path: `/WordOfHope/Nurse/${user}/Manage-Appointments`,
        },
      ],
    },
  ];
  // console.log(imageListRecept[0].basic);
  return (
    <aside>
      <nav>
        <div className="nav-partition">
          {imageListRecept[0].basic.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <div className="nav-partition">
          <div className="partition-title">Patient Management</div>
          {imageListRecept[1].patientMGMT.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <div className="nav-partition">
          <div className="partition-title">Schedule Appointments</div>
          {imageListRecept[2].schedAPMT.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <NavUserInfo
          key={1}
          user={user}
          firstname={backendData && backendData.user[0].firstname}
          lastname={backendData && backendData.user[0].lastname}
          img={backendData && backendData.user[0].empimg}
          pos={backendData && backendData.user[0].position}
          backendData={backendData && backendData}
        />
      </nav>
    </aside>
  );
}









function DoctorNav(props) {
  const {user, backendData} = props;
  // const [backendData, setBackendData] = useState();
  // useEffect(() => {
  //   axios
  //     .get("/WordOfHope/Nurse/" + user)
  //     .then((response) => {
  //       setBackendData(response.data);
  //     })
  //     .catch((error) => {});
  // }, []);
  // const userInfo = backendData.user[0];
  // console.log(backendData.user)

  console.log(backendData);
  const imageListRecept = [
    {
      basic: [
        {
          id: 1,
          url: dashboardbl,
          wurl: dashboardwh,
          title: "Dashboard",
          path: `/WordOfHope/Doctor/${user}/Dashboard`,
        },
        {
          id: 2,
          url: queuebl,
          wurl: queuewh,
          title: "Queues",
          path: `/WordOfHope/Doctor/${user}/Queue`,
        },
        {
          id: 3,
          url: docapmtbl,
          wurl: docapmtwh,
          title: "Appointment",
          path: `/WordOfHope/Doctor/${user}/Appointment-Sched`,
        },
        {
          id: 4,
          url: docLogBl,
          wurl: docLogWh,
          title: "My Attendance Log",
          path: `/WordOfHope/Doctor/${user}/Log`,
        },
      ],
    },
    {
      patientMGMT: [
        {
          id: 1,
          url: patientrecbl,
          wurl: patientrecwh,
          title: "Patient Records",
          path: `/WordOfHope/Doctor/${user}/Patient-Record`,
        },
        {
          id: 2,
          url: patientDemoBl,
          wurl: patientDemoWh,
          title: "Patient Demographics",
          path: `/WordOfHope/Doctor/${user}/Patient-Demographics`,
        },
        {
          id: 3,
          url: resultMgmtBl,
          wurl: resultMgmtWh,
          title: "Result Management",
          path: `/WordOfHope/Doctor/${user}/Result-Management`,
        },
      ],
    },
  ];
  // console.log(imageListRecept[0].basic);
  return (
    <aside>
      <nav>
        <div className="nav-partition">
          {imageListRecept[0].basic.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <div className="nav-partition">
          <div className="partition-title">Patient Management</div>
          {imageListRecept[1].patientMGMT.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <NavUserInfo
          key={1}
          user={user}
          firstname={backendData && backendData.user[0].firstname}
          lastname={backendData && backendData.user[0].lastname}
          img={backendData && backendData.user[0].empimg}
          pos={backendData && backendData.user[0].position}
          backendData={backendData && backendData}
        />
      </nav>
    </aside>
  );
}

function PatientNav(props) {
  const {user, backendData} = props;
  // const [backendData, setBackendData] = useState();
  // useEffect(() => {
  //   axios
  //     .get("/WordOfHope/Nurse/" + user)
  //     .then((response) => {
  //       setBackendData(response.data);
  //     })
  //     .catch((error) => {});
  // }, []);
  // const userInfo = backendData.user[0];
  // console.log(backendData.user)

  const imageListRecept = [
    {
      basic: [
        {
          id: 1,
          url: dashboardbl,
          wurl: dashboardwh,
          title: "Dashboard",
          path: `/WordOfHope/Patient/${user}/Dashboard`,
        },
      ],
    },
    {
      appointments: [
        {
          id: 1,
          url: bookapmtbl,
          wurl: bookapmtwh,
          title: "Book Appointment",
          path: `/WordOfHope/Patient/${user}/Book-Appointment`,
        },
        {
          id: 2,
          url: docSchedBl,
          wurl: docSchedWh,
          title: "My Appointments",
          path: `/WordOfHope/Patient/${user}/My-Appointment`,
        },
      ],
    },
    {
      medicRec: [
        {
          id: 1,
          url: patientProfBl,
          wurl: patientProfWh,
          title: "Patient Profile",
          path: `/WordOfHope/Patient/${user}/Patient-Profile`,
        },
        {
          id: 2,
          url: medihistbl,
          wurl: medihistwh,
          title: "Medical History",
          path: `/WordOfHope/Patient/${user}/Medical-History`,
        },
      ],
    },
  ];
  // console.log(imageListRecept[0].basic);
  return (
    <aside>
      <nav>
        <div className="nav-partition">
          {imageListRecept[0].basic.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <div className="nav-partition">
          <div className="partition-title">Appointments</div>
          {imageListRecept[1].appointments.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
              />
            );
          })}
        </div>
        <div className="nav-partition">
          <div className="partition-title patient-mr">Medical Records</div>
          {imageListRecept[2].medicRec.map((i) => {
            return (
              <MNSAdmin
                key={i.id}
                url={i.url}
                wurl={i.wurl}
                title={i.title}
                path={i.path}
                birthdate={backendData && backendData.user[0].birthdate}
              />
            );
          })}
        </div>
        <NavUserInfo
          key={1}
          firstname={backendData && backendData.user[0].firstname}
          lastname={backendData && backendData.user[0].lastname}
          img={backendData && backendData.user[0].empimg}
          pos={"Patient"}
          backendData={backendData && backendData}
        />
      </nav>
    </aside>
  );
}


export default AdminNav;




export { ReceptionistNav, HRNav, DoctorNav, PatientNav };
