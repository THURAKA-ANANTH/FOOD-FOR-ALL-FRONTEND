import React from "react";

export default function DonationIcon() {
  return (
    <>
      <div
        class="row"
        style={{
          marginBottom: 30,
          marginTop: 20,
        }}
      >
        <div class="col">
          <div
            className="row"
            style={{
              paddingLeft: 20,
            }}
          >
            <div className="col-1">
              <i
                className="material-icons opacity-10 "
                style={{
                  color: "black",
                }}
              >
                location_on
              </i>
            </div>

            <div className="col">Galle</div>
          </div>
        </div>
        <div class="col">
          <div
            className="row"
            style={{
              paddingLeft: 90,
            }}
          >
            <div
              className="col-1"
              style={{
                marginRight: 5,
              }}
            >
              <i
                className="material-icons opacity-10 "
                style={{
                  color: "black",
                }}
              >
                group
              </i>
            </div>

            <div className="col"> 12 Requests</div>
          </div>
        </div>
        <div class="col">
          <div
            className="row"
            style={{
              paddingLeft: 100,
            }}
          >
            <div className="col-1">
              <i
                className="material-icons opacity-10"
                style={{
                  color: "black",
                }}
              >
                schedule
              </i>
            </div>

            <div className="col">12 Days Remaining</div>
          </div>
        </div>
      </div>
    </>
  );
}