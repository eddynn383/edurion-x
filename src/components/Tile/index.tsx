"use client"
import { useDrag, useDrop } from "react-dnd";
import { Checkbox, Icon } from "@/components";
import sx from "@/styles/modules.module.scss"

const Tile = ({ id, title, url, icon, onMoveTile, onToggleSelect, selected, findTile }: any) => {
    const originalIndex = findTile(id).index;
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'tile',
        item: { id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const { id: droppedId, originalIndex } = item;
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                onMoveTile(droppedId, originalIndex);
            }
        }
    }),
        [id, originalIndex, onMoveTile],
    );

    const [, drop] = useDrop(() => ({
        accept: 'tile',
        hover: (item: any) => {
            if (item.id !== id) {
                const { index: overIndex } = findTile(id);
                onMoveTile(item.id, overIndex);
            }
        },
    }),
        [findTile, onMoveTile]
    );

    const handleSelect = () => {
        onToggleSelect(id);
    };

    return (
        <li style={{ opacity: isDragging ? 0.5 : 1 }} className={sx["list-item"]} ref={(node) => drag(drop(node))}>
            <span className={sx["list-item-id"]}>
                <Checkbox checked={selected || false} indeterminate={false} onChange={handleSelect} id="list-checkbox" />
            </span>
            <span className={sx["list-item-title"]}>{title}</span>
            <span className={sx["list-item-url"]}>{url}</span>
            <span className={sx["list-item-icon"]}>{icon}</span>
            <span className={sx["list-item-actions"]}>

            </span>
            <span className={sx["list-item-drag"]} >
                <Icon value="grip-vertical" />
            </span>
        </li>
    )
}

export default Tile
