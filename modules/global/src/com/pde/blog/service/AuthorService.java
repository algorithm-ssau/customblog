/*
 * Copyright 2020 CustomBlog
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.pde.blog.service;

import com.pde.blog.entity.Author;
import com.pde.blog.entity.Publication;

import javax.annotation.Nullable;
import java.util.List;

public interface AuthorService {

    String NAME = "blog_AuthorService";

    /**
     * Get visible publications for author.
     *
     * @param author
     * @return list of publications
     */
    List<Publication> getVisiblePublications(Author author);

    /**
     * Get all publications for author.
     *
     * @param author
     * @return list of publications
     */
    List<Publication> getAllPublications(Author author);

    /**
     * Check if author is banned.
     *
     * @param author
     * @return is banned?
     */
    Boolean isBanned(Author author);

    /**
     * Get avatar image URL for author.
     *
     * @param author
     * @return avatar image URL
     */
    @Nullable
    String getAvatarUrl(Author author);

    /**
     * Update author account.
     *
     * @param author
     * @return updated author
     */
    Author updateAuthor(Author author);

    /**
     * Get publication author.
     *
     * @param publication
     * @return author if have
     */
    @Nullable
    Author getAuthor(Publication publication);
}