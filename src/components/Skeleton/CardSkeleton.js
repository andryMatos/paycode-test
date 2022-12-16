import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const CardSkeleton = () => (
    <Card sx={{ m: 2, width: '-webkit-fill-available' }}>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                        <Grid item xs zeroMinWidth>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Skeleton variant="text" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Skeleton variant="rectangular" height={20} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" height={50} width={80} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default CardSkeleton;