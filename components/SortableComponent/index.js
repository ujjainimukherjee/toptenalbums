import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';

const SortableItem = SortableElement((props) => {
    return (
        <TableRow className="sortable__row">
            <TableCell component="th" scope="row">
                <img alt="album image" src={props.value.imageSrc} />
            </TableCell>
            <TableCell>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>{props.value.albumName}</strong>
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {props.value.albumArtist}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <button
                    className="delete__btn"
                    onClick={() => props.onDelete(props.value.albumId)}
                >
                    Del
                </button>
            </TableCell>
        </TableRow>
    );
});

const SortableList = SortableContainer((props) => {
    return (
        <Table aria-label="simple table">
            <TableBody>
                {props.items.map((value, index) => (
                    <SortableItem
                        key={value.albumId}
                        index={index}
                        value={value}
                        onDelete={props.onDelete}
                    />
                ))}
            </TableBody>
        </Table>
    );
});

const SortableComponent = (props) => {
    return (
        <SortableList
            items={props.data}
            onDelete={props.onDelete}
            onSortEnd={props.onSortEnd}
            axis="xy"
        />
    );
};

SortableComponent.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func,
    onSortEnd: PropTypes.func
};

export default SortableComponent;
