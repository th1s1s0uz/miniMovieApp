import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { styles } from './SearchBar.style';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  compact?: boolean;
  searchQuery?: string; // Redux state'ten gelen query
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  placeholder = "Film ara...", 
  isLoading = false,
  compact = false,
  searchQuery = ''
}) => {
  const [query, setQuery] = useState(searchQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentSearchRef = useRef('');

  // Redux state ile senkronize et
  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const debouncedSearch = useCallback((searchQuery: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      const trimmedQuery = searchQuery.trim();
      
      // Prevent duplicate searches
      if (trimmedQuery === currentSearchRef.current) {
        return;
      }
      
      currentSearchRef.current = trimmedQuery;
      onSearch(trimmedQuery);
    }, 500);
  }, [onSearch]);

  // Effect to trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, debouncedSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    currentSearchRef.current = '';
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onSearch('');
    if (onClear) {
      onClear();
    }
  }, [onSearch, onClear]);

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={[styles.searchContainer, compact && styles.compactSearchContainer]}>
        <View style={styles.inputContainer}>
          <Ionicons 
            name="search" 
            size={22} 
            color={colors.blue} 
            style={styles.searchIcon} 
          />
          <TextInput
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder={placeholder}
            placeholderTextColor={colors.darkGray}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isLoading && (
            <ActivityIndicator 
              size="small" 
              color={colors.blue} 
              style={styles.loadingIcon} 
            />
          )}
          {query.length > 0 && !isLoading && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Ionicons 
                name="close-circle" 
                size={20} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}; 