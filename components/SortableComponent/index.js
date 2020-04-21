import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const SortableItem = SortableElement((props) => {
    return (
        <TableRow className="sortable__row">
            <TableCell component="th" scope="row">
                <img alt="album image" src={props.value.imageSrc} />
            </TableCell>
            <TableCell>
                {props.value.albumName} by {props.value.albumArtist}
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

export default SortableComponent;
