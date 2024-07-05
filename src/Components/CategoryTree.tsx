import {
  Checkbox,
  Collapse,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { categories } from "../common/constants";
import { SelectedState } from "../types/SelectedState";

const CategoryTree = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<SelectedState>({});

  const handleToggleExpand = (department: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [department]: !prevExpanded[department],
    }));
  };

  const handleToggleSelect = (department: string, subDepartment?: string) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (subDepartment) {
        newSelected[department] = newSelected[department] || { all: false };
        newSelected[department][subDepartment] =
          !newSelected[department][subDepartment];

        const allSelected =
          categories
            .find((d) => d.department === department)
            ?.sub_departments.every((sub) => newSelected[department][sub]) ||
          false;
        newSelected[department].all = allSelected;
      } else {
        const allSelected = !newSelected[department]?.all;
        newSelected[department] = { all: allSelected };
        categories
          .find((d) => d.department === department)
          ?.sub_departments.forEach((sub) => {
            newSelected[department][sub] = allSelected;
          });
      }

      return newSelected;
    });
  };

  const isIndeterminate = (department: string): boolean => {
    const subDepartments =
      categories.find((d) => d.department === department)?.sub_departments ||
      [];
    const selectedCount = subDepartments.filter(
      (sub) => selected[department]?.[sub]
    ).length;
    return selectedCount > 0 && selectedCount < subDepartments.length;
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.department}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => handleToggleExpand(category.department)}>
              {expanded[category.department] ? <Plus /> : <Minus />}
            </IconButton>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected[category.department]?.all || false}
                  indeterminate={isIndeterminate(category.department)}
                  onChange={() => handleToggleSelect(category.department)}
                />
              }
              label={category.department}
            />
          </div>
          <Collapse
            in={!expanded[category.department]}
            timeout="auto"
            unmountOnExit
          >
            <div className="flex flex-col ml-16">
              {category.sub_departments.map((subDepartment) => (
                <FormControlLabel
                  key={subDepartment}
                  control={
                    <Checkbox
                      checked={
                        selected[category.department]?.[subDepartment] || false
                      }
                      onChange={() =>
                        handleToggleSelect(category.department, subDepartment)
                      }
                    />
                  }
                  label={subDepartment}
                />
              ))}
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default CategoryTree;
