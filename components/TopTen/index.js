import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SortableComponent from '../../components/SortableComponent';

const TopTen = props => {
    return (
        <Grid
            className="topTen__wrapper"
            container
            justify="center"
            spacing={3}
        >
            <Grid item xs={6}>
                <SortableComponent
                    data={props.data}
                    onSortEnd={props.onSortEnd}
                    onDelete={props.onDelete}
                />
            </Grid>
        </Grid>
    );
};

TopTen.propTypes = {
    data: PropTypes.array,
    onSortEnd: PropTypes.func,
    onDelete: PropTypes.func,
};

export default TopTen;
