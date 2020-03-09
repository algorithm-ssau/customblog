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
import jdk.internal.jline.internal.Nullable;

import java.util.List;

public interface AuthorService {

    String NAME = "blog_AuthorService";

    List<Publication> getVisiblePublications(Author author);

    List<Publication> getAllPublications(Author author);

    @Nullable
    Boolean isBanned(Author author);

    @Nullable
    String getAvatarUrl(Author author);

    Author updateAuthor(Author author);

    @Nullable
    Author getAuthor(Publication publication);
}