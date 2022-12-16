import { useEffect, useState } from "react"
import { getData, logout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, Chip, Stack, Button } from "@mui/material";
import SouthEastIcon from '@mui/icons-material/SouthEast';
import UserService from "../services/user.service";
import { ArrowOutward } from "@mui/icons-material";
import ChartCardSkeleton from "./Skeleton/ChartCard";
import CardSkeleton from "./Skeleton/CardSkeleton";
import Chart from 'react-apexcharts';
import chartData from '../data/data.js';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate  } from 'react-router-dom';


export const Dashboard = () => {

    const [userData, setUserData] = useState({});
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(true);
    const [totalSales, setTotalSales] = useState(0);
    const navigate = useNavigate();

    /* graficos */
    const [datas, setDatas] = useState({});
    const [dataGrafica, setDataGrafica] = useState(chartData);

    const logOut = () => {
        dispatch(logout());
    }

    const handleChangeTime = (day) => {
        setTime(!time);
        if(day){
            let total = datas.previousDay.revenuePerHour.reduce((a, b) => Number(a) + Number(b), 0);
            setTotalSales(total);
            setUserData(datas.previousDay);
            const grafica = [
                    {
                    data: datas.previousDay.revenuePerHour
                }
            ]
            const newData = {...chartData, series: grafica};
            setDataGrafica(newData);
        }else{
            let total = datas.revenuePerHour.reduce((a, b) => Number(a) + Number(b), 0);
            setTotalSales(total);
            setUserData(datas)
            const grafica = [
                    {
                    data: datas.revenuePerHour
                }
            ]
            const newData = {...chartData, series: grafica};
            setDataGrafica(newData);
        }
    }

    useEffect(() => {
        dispatch(getData());
        setLoading(true);
        UserService.userReport().then(
            (data) => {
                setUserData(data);
                setDatas(data);
                let total = data.revenuePerHour.reduce((a, b) => Number(a) + Number(b), 0);
                setTotalSales(total);
                const grafica = [
                        {
                        data: data.revenuePerHour
                    }
                ]
                const newData = {...chartData, series: grafica};
                setDataGrafica(newData);
            },
            (error) => {
              setLoading(false);
              localStorage.removeItem("userToken");
              navigate('/');
            }
        );
        setLoading(false);
        // eslint-disable-next-line
    },[]);

    return(
        <Grid container spacing={1}>
                <Grid item xs={12} textAlign='center'>
                    <Grid container alignItems="center" justifyContent="space-around">
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography sx={{ fontSize: 44 }} style={{color: "#212121"}} gutterBottom>
                                        Bienvenido: { user?.name }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={6} md={12} sm={12} xs={12}>
                            <Button variant="contained" startIcon={<ExitToAppIcon />} onClick={logOut} style={{backgroundColor: '#eeeeee', color: '#212121'}}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="space-around" >
                    <Grid >
                        <Grid container >
                            <Grid item>
                                <Button
                                    disableElevation
                                    variant={time ? 'contained' : 'text'}
                                    size="small"
                                    color="success"
                                    onClick={() => handleChangeTime(0)}
                                    > Hoy
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Button
                                disableElevation
                                variant={!time ? 'contained' : 'text'}
                                size="small"
                                sx={{ color: 'inherit' }}
                                onClick={() => handleChangeTime(1)}
                                >
                                Ayer
                            </Button>
                        </Grid>
                    </Grid>
                <Grid container spacing={1} alignItems={'baseline'}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        {
                            loading ? <ChartCardSkeleton/>
                            :
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 24 }} color="text.secondary">Ingresos</Typography>
                                    <Stack direction="row" spacing={1} alignItems='center'>
                                        <Typography sx={{ fontSize: 34 }} style={{color: '#212121', fontStyle:'bold'}}>
                                            ${ totalSales }
                                        </Typography>
                                        <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                            mxn
                                        </Typography>
                                    </Stack>
                                    <Chart {...dataGrafica} />
                                </CardContent>
                            </Card>
                        }
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Grid container spacing={2}>
                            <Grid item sm={12} xs={12} md={6} lg={12}>
                                {
                                    loading ? <CardSkeleton/>
                                    :
                                    <Card sx={{ m: 2, width: '-webkit-fill-available' }}>
                                        <CardContent>
                                            <Stack direction="row" spacing={1} alignItems='center' justifyContent={'space-between'}>
                                                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                                    Ticket Promedio
                                                </Typography>
                                                <Chip icon={<SouthEastIcon style={{color:'#b71c1c'}} />} style={{backgroundColor: '#ffcdd2', color:'#b71c1c'}} label="10.8%"/>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems='center'>
                                                <Typography sx={{ fontSize: 34 }} style={{color: '#212121', fontStyle:'bold'}}>
                                                    ${ userData?.averageTicket }
                                                </Typography>
                                                <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                                    mxn
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                }
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={12}>
                                {
                                    loading ? <CardSkeleton/>
                                    :
                                    <Card sx={{ m: 2 , width: '-webkit-fill-available'}}>
                                        <CardContent>
                                            <Stack direction="row" spacing={1} alignItems='center' justifyContent={'space-between'}>
                                                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                                    Ticket Tope
                                                </Typography>
                                                <Chip icon={<ArrowOutward style={{color:'#4caf50'}} />} style={{backgroundColor: '#c8e6c9', color:'#4caf50'}} label="10.8%"/>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems='center'>
                                                <Typography sx={{ fontSize: 34 }} style={{color: '#212121', fontStyle:'bold'}}>
                                                    ${ userData?.topTicket }
                                                </Typography>
                                                <Typography sx={{ fontSize: 24 }} color="text.secondary">
                                                    mxn
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                }
                            </Grid>
                            <Grid item sm={12} xs={12} md={6} lg={12}>
                                {
                                    loading ? <CardSkeleton/>
                                    :
                                    <Card sx={{ m: 2 , width: '-webkit-fill-available'}}>
                                        <CardContent>
                                            <Stack direction="row" spacing={1} alignItems='center'>
                                                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                                    Método de pago más usado
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ fontSize: 34 }} style={{color: '#212121', fontStyle:'bold'}}>
                                                { userData?.topPaymentMethod === 'card' ? <> Tarjeta de crédito/debito</> : <> Otro</> }
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}
