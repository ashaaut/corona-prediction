import React, {Component} from "react";

export default class Header extends Component {
    render() {
        return (
          <div className="footer">
              <div className="footer">
                  <div>Corona Visualizer unofficial</div>
                  <div className={"maker-info"}>
                      <div>Created And Managed By - Asha Autade</div>
                      <div className={"multiple-links"}>
                          <a href="https://in.linkedin.com/in/asha-autade-777b61137">LinkedIn</a>
                          <a href="https://github.com/ashaaut">GitHub</a>
                      </div>
                  </div>
                  <div className={"helpers-info"}>
                      <div className={"must-show"}> Thanks To </div>
                      <div>Crowd Sourced Data From -</div>
                      <div className={"multiple-links-data"}>
                          <a
                            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd/pubhtml">Data
                              Sheet</a>
                          <a href="https://www.covid19india.org/">API by covid19india.org</a>
                      </div>
                  </div>
                  <div className={"helpers-git"}> <div className={"right-padding"}>Application Help from -</div> <a href="https://github.com/kaskichandrakant">Chandrakant Kaski</a> </div>
              </div>
              <div className={"must-show"}> * Only For Educational Purpose</div>
          </div>
        );
    }
}
