import React from "react";
import Downshift from "downshift";
import {
  InputBase,
  Theme,
  WithStyles,
  withStyles,
  Paper,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import { IUISchema } from "../UISchema";
import suggestions from "../examplesList";

const styles = (theme: Theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
  },
});

interface IProps extends WithStyles<typeof styles> {
  uiSchema?: IUISchema;
  searchBarUrl: string | undefined;
  onChangeUrl?: any;
  onDarkModeChange?: any;
  onSplitViewChange?: any;
}

function getSuggestion(query: string | null) {
  if (!query) {
    return suggestions;
  }
  return suggestions.filter((value) => {
    return value.name.includes(query) || value.url.includes(query);
  });
}

const SearchBar: React.FC<IProps> = (props) => {
  const { uiSchema,  searchBarUrl, onChangeUrl } = props;
  return (
    <Downshift initialInputValue={searchBarUrl} onInputValueChange={onChangeUrl} id="downshift">
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        selectItem,
        openMenu,
        clearSelection,
      }) => (
          <div>
            <InputBase
              {...getInputProps({
                onBlur: (e: any) => {
                  selectItem(e.target.value);
                },
                onChange: (e: any) => {
                  if (e.target.value === "") {
                    clearSelection();
                  }
                },
              } as any)}
              onFocus={(event: any) => openMenu()}
              placeholder={uiSchema && uiSchema.appBar["ui:inputPlaceholder"]}
              style={{ width: "100%" }}
            />
            <div {...getMenuProps()} style={{ position: "absolute", zIndex: 1 }}>
              {isOpen ? (
                <Paper style={{ maxWidth: "640px" }}>
                  {getSuggestion(inputValue).map((suggestion: any, index: number) => {
                    const isSelected = highlightedIndex === index;
                    return (
                      <MenuItem
                        {...getItemProps({ item: suggestion.url })}
                        key={suggestion.url}
                        selected={isSelected}
                        component="div"
                        style={{
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <Typography variant="subtitle1">{suggestion.name}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption">{suggestion.url}</Typography>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    );
                  })}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
    </Downshift>
  );
};

export default withStyles(styles)(SearchBar);
