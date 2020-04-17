import React from 'react';
import Grid from '@material-ui/core/Grid';
import SortableComponent from '../../components/SortableComponent';

const TopTen = (props) => {
    return (
        <Grid className="topTen__wrapper" container spacing={3}>
            <Grid item xs={12}>
                <SortableComponent
                    data={props.data.topTenAlbums}
                    onSortEnd={props.onSortEnd}
                    onDelete={props.onDelete}
                />
            </Grid>
        </Grid>
    );
};

export default TopTen;
