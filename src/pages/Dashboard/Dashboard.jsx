import React, { useState , useContext } from 'react'
import SideMenu from '../../components/SideMenu/SideMenu'
import Header from '../../components/Header/Header'
import "./dashboard.css"
import { ThemeContext } from '../../js/theme'
import LineGraph from '../../charts/LineGraph/LineGraph'
import PieGraph from '../../charts/PieGraph/PieGraph'
import BarGraph from '../../charts/BarGraph/BarGraph'
export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState(false)
  const {theme} = useContext(ThemeContext)
  return (
    <div >
      <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div
    className={`container ${activeMenu ? "active" : ""} ${theme === "dark" ? "dark-mode" : ""}`}>
        <div className="cards">
          <div className="card">
            <div className="text">
              <h4>total orders</h4>
              <h2>150</h2>
            </div>
            <i className="bi bi-cart"></i>
          </div>

          <div className="card">
            <div className="text">
              <h4>total ernings</h4>
              <h2>15000$</h2>
            </div>
            <i className="bi bi-currency-dollar"></i>
          </div>

          <div className="card">
            <div className="text">
              <h4>total sales / month</h4>
              <h2>150</h2>
            </div>
            <i className="bi bi-activity"></i>
          </div>

          <div className="card">
            <div className="text">
              <h4>users rating</h4>
              <h2>8.5</h2>
            </div>
            <i className="bi bi-star"></i>
          </div>
        </div>
        <div className="charts-row">
          <div className="chart">
            <LineGraph/>
          </div>
          <div className="chart">
            <PieGraph/>
          </div>
        </div>
        <div className="charts-row">
          <div className="chart">
            <BarGraph/>
          </div>
        </div>
        </div>
    </div>
  )
}

