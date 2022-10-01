import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getFundByID } from '../../../api/fund.api';
import { getOrganizationByID } from '../../../api/organization.api';
import NavButton from '../../NavButton';
import ProgressBar from "@ramonak/react-progress-bar";
import { getRemainingTime } from '../../common/getRemainingTime';
import LoadingSpinner from '../../common/LoadingSpinner';
import { getCookie } from '../../common/getCookie';

export default function SelectedFund() {
  const [fund, setFund] = useState({ organizationID: "", endingDate: "2022-09-27T12:20:02.029+00:00" });
  const [organization, setOrganization] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const { fundID } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getFundByID(fundID)
      .then(res => {
        // console.log(res.data.fund);
        setFund(res.data.fund);
        setIsLoaded(true);
      })
      .catch(err => {
        console.log(err);
      })
  }, [fundID])

  useEffect(() => {
    getOrganizationByID(fund.organizationID)
      .then(res => {
        // console.log(res.data.organization);
        setOrganization(res.data.organization);
      })
  }, [fund.organizationID])

  const toggleSidenav = (e) => {
    e.preventDefault();
    document.body.classList.remove("g-sidenav-pinned");
  };


  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {
          fund.organizationID === getCookie("_id") ? (<NavButton page="Funds" path="Organization" />) : null
        }


        <div className="container-fluid" onClick={toggleSidenav}>
          <i className="bi bi-arrow-left-circle fs-4 cursor-pointer"
            onClick={() => navigate(-1)}> Go back</i>
          <h3 className='mt-3'>{fund.title}</h3>
          {
            fund.organizationID === getCookie("_id") && fund.status !== "completed" ? (
              <div className="col-lg-2 col-sm-3 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                <div className="nav-wrapper position-relative end-0">
                  <ul className="nav nav-pills nav-fill p-1" role="tablist">
                    <li className="nav-item">
                      <Link className="nav-link mb-0 px-0 py-1 active" to={`/fund/editFund`} state={fund}>
                        <i className="material-icons text-lg position-relative">edit</i>
                        <span className="ms-1">Edit</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link mb-0 px-0 py-1 text-primary">
                        <i className="material-icons text-lg position-relative">delete</i>
                        <span className="ms-1">Remove</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null
          }
          {isLoaded ? (
            <div className="row">
              <div className="col-sm-5 row">
                <div className="my-5">
                  <img src={fund.fundImage} className="img-fluid rounded card-image" alt={fund.title} />
                </div>
                <div className='card p-3'>
                  <h5>Contact Info</h5>
                  <div className="row mt-2">
                    <h6 className="text-dark font-weight-bold col-md-3">Email:</h6>
                    <span className="mb-0 col-md-9">{fund.contactEmail}</span>
                  </div>
                  <div className="row">
                    <h6 className="text-dark font-weight-bold col-md-3">Contact:</h6>
                    <span className="mb-0 col-md-9">{fund.contactNumber}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-7 my-5 ps-sm-4">
                <h5>Target</h5>
                <p className='text-justify'>{fund.target}</p>
                <div className='mt-3'>
                  <div className="d-flex">
                    <div className='text-dark font-weight-bold p-2 ps-0'>Budget:</div>
                    <div className='p-2'>Rs. {fund.budget}</div>
                  </div>
                  <div>
                    <ProgressBar
                      completed={Math.round(fund.currentAmount / fund.budget * 100 * 100) / 100} // rounded to 2 decimal places
                      className="px-4" />
                  </div>
                  <div className="d-flex mt-3">
                    <div className='text-dark font-weight-bold p-2 ps-0'>Ending date:</div>
                    <div className='p-2'>{new Date(fund.endingDate).toISOString().split('T')[0]}</div>
                  </div>
                  <div className="d-flex">
                    <div className='text-dark font-weight-bold p-2 ps-0'>Timeleft:</div>
                    <div className='p-2'>{getRemainingTime(fund.endingDate)}</div>
                  </div>
                  <div className="mt-3">
                    <h5 className='text-dark font-weight-bold p-2 ps-0'>Description</h5>
                    <div className='p-2 text-justify'>{fund.description}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : <LoadingSpinner />}

        </div>
      </main >
    </>
  )
}
