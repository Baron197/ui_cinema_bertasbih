import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { getSpecificMovie } from '../actions';
import queryString from 'query-string';

class OrderSeats extends Component {
    state = { listBangku: { }, studio: { }, getDataStudio: false, totalPrice: 0}
    
    componentWillMount() {
        if(this.props.movie.id !== 0) {
            axios.get(API_URL_1 + '/studios', {
                params: {
                    id: this.props.movie.id
                }
            }).then((response1) => {
                this.getOrderList("Morning", response1.data[0], false)
            })
        }
        else{
            let params = queryString.parse(this.props.location.search)
            this.props.getSpecificMovie(params.id);
            // alert(params.nama);
            // this.props.getSpecificMovie(this.props.match.params.id);
        }
    }

    getOrderList = (schedule, theStudio, bangkuTerisi) => {
        axios.get(API_URL_1 + '/orders', {
            params: {
                movieId: this.props.movie.id,
                jadwal: schedule
            }
        }).then((response2) => {
            if(response2.data.length > 0) {
                for(var index in response2.data) {
                    axios.get(API_URL_1 + '/ordersDetails', {
                        params: {
                            orderId: response2.data[index].id
                        }
                    }).then((response3) => {
                        var { jumlahBaris, jumlahKursi } = theStudio;
                        var listBangku = { };
            
                        for(var i = 1; i <= jumlahBaris; i++) {
                            if(bangkuTerisi === false) {
                                listBangku[`row${i}Disabled`] = [];
                                listBangku[`row${i}Checked`] = [];
        
                                for(var j = 1; j <= (jumlahKursi/jumlahBaris); j++) {
        
                                    var check = false;
                                    for(var index in response3.data) {
                                        if(i === response3.data[index].row && j === response3.data[index].seat)
                                        {
                                            check = true;
                                        }
                                    }
        
                                    if(check) {
                                        listBangku[`row${i}Disabled`].push(true);
                                        listBangku[`row${i}Checked`].push(true);
                                    } 
                                    else {
                                        listBangku[`row${i}Disabled`].push(false);
                                        listBangku[`row${i}Checked`].push(false);
                                    }
                                }
                            }
                            else {
                                listBangku = this.state.listBangku;
        
                                for(var j = 1; j <= (jumlahKursi/jumlahBaris); j++) {
        
                                    var check = false;
                                    for(var index in response3.data) {
                                        if(i === response3.data[index].row && j === response3.data[index].seat)
                                        {
                                            check = true;
                                        }
                                    }
        
                                    if(check) {
                                        listBangku[`row${i}Disabled`][j-1] = true;
                                        listBangku[`row${i}Checked`][j-1] = true;
                                    } 
                                }
                            }
                        }
                        bangkuTerisi = true;
                        this.setState({ listBangku ,studio: theStudio, getDataStudio: true, totalPrice: 0 });
                    })
                }
            }
            else {
                var { jumlahBaris, jumlahKursi } = theStudio;
                var listBangku = { };
    
                for(var i = 1; i <= jumlahBaris; i++) {
    
                    listBangku[`row${i}Disabled`] = [];
                    listBangku[`row${i}Checked`] = [];

                    for(var j = 1; j <= (jumlahKursi/jumlahBaris); j++) {
                        listBangku[`row${i}Disabled`].push(false);
                        listBangku[`row${i}Checked`].push(false);
                    }
                }
                this.setState({ listBangku ,studio: theStudio, getDataStudio: true, totalPrice: 0  });
            }
        })
    }

    onCBChecked(row, nomor) {
        // console.log(nomor)
        // console.log(row)
        if(!this.state.listBangku[`row${row}Disabled`][nomor]) {
            var objHarga = { Morning: 25000, Evening: 35000}
            this.state.listBangku[`row${row}Checked`][nomor] = !this.state.listBangku[`row${row}Checked`][nomor];
            if(this.state.listBangku[`row${row}Checked`][nomor]){
                this.state.totalPrice += objHarga[this.inputSchedule.value];
                // this.setState({ totalPrice: (this.state.totalPrice+25000)})
            }
            else if(!this.state.listBangku[`row${row}Checked`][nomor]){
                this.state.totalPrice -= objHarga[this.inputSchedule.value];
            }
            this.setState({})
        }
    }   
    
    onSelectSchedule = () => {
        var selectedSchedule = this.inputSchedule.value;
        // console.log(selectedSchedule)
        this.getOrderList(selectedSchedule, this.state.studio, false);
    }

    onBtnCheckOutClick = () => {
        if(this.props.auth.id !== 0) {
            if(window.confirm("Are you sure to Checkout?")){
                axios.post(API_URL_1 + '/orders', {
                    userId: this.props.auth.id,
                    movieId: this.props.movie.id,
                    studioId: this.state.studio.id,
                    jadwal: this.inputSchedule.value,
                    totalHarga: this.state.totalPrice
                }).then((res1) => {
                    var { jumlahBaris, jumlahKursi } = this.state.studio;
                    for(var i = 1; i <= jumlahBaris; i++){
                        for(var j = 0; j < (jumlahKursi/jumlahBaris); j++) {
                            if(!this.state.listBangku[`row${i}Disabled`][j] 
                                && this.state.listBangku[`row${i}Checked`][j])
                            {
                                axios.post(API_URL_1 + '/ordersDetails',{
                                    orderId: res1.data.id,
                                    row: i,
                                    seat: j+1
                                }).then((res2) => {
                                    this.successCheckout();
                                })
                            }
                        }
                    }
                })
            }
        }
        else {
            alert("Please Login First!");
        }
    }

    successCheckout = () => {
        alert("Checkout Success!! Total Price is Rp. " + this.state.totalPrice);
        this.getOrderList(this.inputSchedule.value, this.state.studio, false);
    }

    renderBangkuRow = (i) => {
        var arrJSX = this.state.listBangku[`row${i}Disabled`].map((item, index) => {
            if(item == false) {
                return(
                    <td style={{ backgroundColor: "green"}}>
                        <input 
                            type="checkbox" 
                            onClick={() => this.onCBChecked(i, index)}
                            checked={this.state.listBangku[`row${i}Checked`][index]} 
                            id={`row${i}Kursi${index}`}
                            disabled={item}
                        />
                    </td>
                );
            }
            else {
                return(
                    <td style={{ backgroundColor: "red"}}>
                        <input 
                            type="checkbox" 
                            onClick={() => this.onCBChecked(i, index)}
                            checked={this.state.listBangku[`row${i}Checked`][index]} 
                            id={`row${i}Kursi${index}`}
                            disabled={item}
                        />
                    </td>
                );
            }
        })
        // for(var j = 0; j < 10; j++){
        //     if(this.state.listBangku[`row${i}Disabled`][j] == false) {
        //         arrJSX.push(
        //             <td style={{ backgroundColor: "green"}}>
        //                 <input 
        //                     type="checkbox" 
        //                     onClick={() => this.onCBChecked(i, j)}
        //                     // defaultChecked={this.state.listBangku[`row${i}Checked`][j]} 
        //                     id={`row${i}Kursi${j}`}
        //                     disabled={this.state.listBangku[`row${i}Disabled`][j]}
        //                 />
        //             </td>
        //         );
        //     }
        //     else {
        //         arrJSX.push(
        //             <td style={{ backgroundColor: "red"}}>
        //                 <input 
        //                     type="checkbox" 
        //                     onClick={() => this.onCBChecked(i, j)}
        //                     // defaultChecked={this.state.listBangku[`row${i}Checked`][j]} 
        //                     id={`row${i}Kursi${j}`}
        //                     disabled={this.state.listBangku[`row${i}Disabled`][j]}
        //                 />
        //             </td>
        //         );
        //     }
        // }

        // console.log(this.state);
        // console.log(arrJSX);

        return arrJSX;
    }

    renderBangku = () => {
        var arrJSX = [];
        if(this.state.getDataStudio === true) {
            for(var i = 1; i <= this.state.studio.jumlahBaris; i++) {
                arrJSX.push(
                    <tr>{this.renderBangkuRow(i)}</tr>
                );
            }
        }

        return arrJSX;
    }

    render() {
        const { id, title, url, image, description } = this.props.movie;
        // console.log(this.state.listBangku)
        if(id !== 0) {
            return(
                <div className="container" style={{paddingTop:"100px"}}>
                    <div className="row">
                        <div className="col-xs-4">
                            <img className="img-responsive" alt="Movie Desc" src={image}/>
                        </div>
                        <div className="col-xs-8" style={{ textAlign:"left"}}>
                            <h1>{title}</h1>
                            <p style={{ paddingLeft: "10px"}}>{description}</p>
                            <a style={{ marginLeft: "10px", marginRight: "10px"}} href={url} className="btn btn-default">
                                IMDB
                            </a>
                            {/* <DropdownButton
                                bsStyle={"Schedule"}
                                title={"Schedule"}
                                id={`dropdown-basic`}
                                >
                                <MenuItem eventKey="1">Morning</MenuItem>
                                <MenuItem eventKey="2">Evening</MenuItem>
                            </DropdownButton> */}
                            <FormGroup style={{width:"150px", display:"inline"}} controlId="formControlsSelect">
                                <FormControl inputRef={ kucing => this.inputSchedule=kucing }  onChange={this.onSelectSchedule} style={{width:"150px", display:"inline"}} componentClass="select" placeholder="select">
                                    {/* <option value="select">-Pick Schedule-</option> */}
                                    <option value="Morning">Morning</option>
                                    <option value="Evening">Evening</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4"></div>
                        <div className="col-xs-3" style={{ paddingLeft: "30px"}}>
                            <h3 className="label-success">Layar</h3>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "30px"}}>
                        <div className="col-xs-4"></div>
                        <div className="col-xs-8" style={{ paddingLeft: "90px"}}>
                            <table>
                                { this.renderBangku() }
                            </table>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "30px"}}>
                        <div className="col-xs-4"></div>
                        <div className="col-xs-3" style={{ paddingLeft: "30px"}}>
                            <h3>Total Harga : Rp. {this.state.totalPrice}</h3>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "30px"}}>
                        <div className="col-xs-4"></div>
                        <div className="col-xs-3" style={{ paddingLeft: "30px"}}>
                            <input type="button" value="Checkout" className="btn btn-success" onClick={this.onBtnCheckOutClick}/>
                        </div>
                    </div>
                </div>
            );
        }
        
        return <Redirect to='/' />;
    }
}

const mapStateToProps = (state) => {
    const movie = state.selectedMovie;
    const auth = state.auth;

    return { movie, auth };
}

export default connect(mapStateToProps, { getSpecificMovie })(OrderSeats);